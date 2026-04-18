import OpenAI from "openai";
import { NextResponse } from "next/server";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { skillCategories } from "@/data/skills";
import {
  portfolioNavigation,
  siteProjectPageUrl,
  sourceFileLink,
} from "@/lib/siteUrl";
import { checkChatRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeAssistantHtml } from "@/lib/sanitizeAssistantHtml";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "gpt-4o-mini";
const MAX_MESSAGE_LENGTH = 1500;

const SYSTEM_PROMPT = `You are GauravGPT, an AI assistant for Gaurav Shetty's portfolio website. Your job is to answer visitor questions accurately and helpfully.

Rules:
- Use the provided tools to fetch factual information about Gaurav before answering. Do not invent employers, dates, project names, or publications.
- If a tool returns empty or the question is outside the portfolio (unrelated), say you can only help with Gaurav's professional background and suggest what you can discuss.
- Be concise and professional. Use bullet lists when listing multiple items.
- Format your final answer as simple HTML only: use <p>, <ul>, <li>, <strong>, <em>, and <a href="..." target="_blank" rel="noopener noreferrer"> for links. Do not use markdown. Do not wrap the whole reply in a single code block.
- When tool results include \`navigation\`, \`portfolioPageUrl\`, or \`viewOnGithub\`, prefer linking users to those exact URLs so they can open the matching portfolio section or project page.
- Do not claim to have personal access to private data beyond what the tools return.`;

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "fetch_personal_details",
      description:
        "Name, role, bio, contact email, social links (LinkedIn, GitHub, Google Scholar), headline stats (years experience, papers, models), and certifications.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_education_details",
      description:
        "Degrees: institutions, locations, degree names, graduation dates.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_experience",
      description:
        "Full work history: companies, roles, periods, and detailed project bullets per role.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_personal_projects",
      description:
        "Portfolio / personal projects on this site: titles, slugs, summaries, tech stacks, outcomes (not the same as employer project bullets).",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_research_work",
      description:
        "Published research papers (IEEE): titles, venues, dates, descriptions, URLs.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_skills",
      description:
        "Skills grouped by category (languages, ML, data viz, cloud, etc.).",
      parameters: { type: "object", properties: {} },
    },
  },
];

function runTool(name: string): string {
  const nav = portfolioNavigation();

  switch (name) {
    case "fetch_personal_details":
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: {
            about: nav.sections.about,
            contact: nav.sections.contact,
          },
        },
        sourceFile: sourceFileLink("src/data/personal.ts"),
        name: personal.name,
        title: personal.title,
        subtitle: personal.subtitle,
        bio: personal.bio,
        email: personal.email,
        social: personal.social,
        stats: personal.stats,
        certifications: personal.certifications,
      });
    case "fetch_education_details":
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: { education: nav.sections.education },
        },
        sourceFile: sourceFileLink("src/data/personal.ts"),
        education: personal.education,
      });
    case "fetch_experience":
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: { experience: nav.sections.experience },
        },
        sourceFile: sourceFileLink("src/data/experience.ts"),
        experiences,
      });
    case "fetch_personal_projects": {
      const summary = projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        shortDescription: p.shortDescription,
        category: p.category,
        keywords: p.keywords,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        sections: p.sections,
        portfolioPageUrl: siteProjectPageUrl(p.slug),
      }));
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: { projects: nav.sections.projects },
        },
        sourceFile: sourceFileLink("src/data/projects.ts"),
        projects: summary,
      });
    }
    case "fetch_research_work":
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: { publications: nav.sections.publications },
        },
        sourceFile: sourceFileLink("src/data/publications.ts"),
        publications,
      });
    case "fetch_skills":
      return JSON.stringify({
        navigation: {
          ...nav,
          relevantSections: { skills: nav.sections.skills },
        },
        sourceFile: sourceFileLink("src/data/skills.ts"),
        skillCategories,
      });
    default:
      return JSON.stringify({ error: "unknown_tool", name });
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Missing OPENAI_API_KEY. Add it to .env.local, then stop and restart `npm run dev`.",
        },
        { status: 500 }
      );
    }

    const clientIp = getClientIp(request);
    const rate = checkChatRateLimit(clientIp);
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    let body: { message?: string; query?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const userText =
      typeof body.message === "string"
        ? body.message
        : typeof body.query === "string"
          ? body.query
          : "";

    const trimmed = userText.trim();
    if (!trimmed) {
      return NextResponse.json(
        { error: "Missing message or query" },
        { status: 400 }
      );
    }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters).`,
        },
        { status: 413 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: trimmed },
    ];

    const maxToolRounds = 8;
    let round = 0;

    while (round < maxToolRounds) {
      round += 1;
      let completion: OpenAI.Chat.Completions.ChatCompletion;
      try {
        completion = await openai.chat.completions.create({
          model: MODEL,
          messages,
          tools,
          tool_choice: "auto",
          temperature: 0.3,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json(
          {
            error:
              "OpenAI request failed. Check your API key and billing at platform.openai.com.",
            details:
              process.env.NODE_ENV === "development" ? message : undefined,
          },
          { status: 502 }
        );
      }

      const choice = completion.choices[0];
      const msg = choice?.message;
      if (!msg) {
        return NextResponse.json(
          { error: "No response from model" },
          { status: 502 }
        );
      }

      if (!msg.tool_calls?.length) {
        const raw = msg.content?.trim() ?? "";
        const response = sanitizeAssistantHtml(raw);
        return NextResponse.json({ response, query: trimmed });
      }

      messages.push({
        role: "assistant",
        content: msg.content,
        tool_calls: msg.tool_calls,
      });

      for (const call of msg.tool_calls) {
        if (call.type !== "function") continue;
        const id = call.id;
        const name = call.function.name;
        let output: string;
        try {
          output = runTool(name);
        } catch (e) {
          output = JSON.stringify({
            error: "tool_execution_failed",
            message: e instanceof Error ? e.message : String(e),
          });
        }

        messages.push({
          role: "tool",
          tool_call_id: id,
          content: output,
        });
      }
    }

    return NextResponse.json(
      { error: "Too many tool rounds" },
      { status: 500 }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        error: "Unexpected server error.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}

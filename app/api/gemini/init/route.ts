// app/api/gemini/init/route.ts
import {NextRequest, NextResponse} from "next/server";
import {GeminiPromptStructTourism} from "@/app/api/prompt";
import 'dotenv/config';
import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI(({apiKey: process.env.API_KEY_GEMINI}))

// 首页, 用于接收用户首次生成
export async function POST(req: NextRequest){
    try {
        const { message } = await req.json();
        // we can support stream response here
        const response = await ai.models.generateContent(
            {
                model: "gemini-1.5-flash",
                contents: `${GeminiPromptStructTourism}\n\n
                         Users query:${message}\n
                         `
            }
        );
        const text = response.text;
        // 尝试直接解析 JSON
        try {
            if (text != null) {
                const json = JSON.parse(text);
                return NextResponse.json(json);
            } else {
                return NextResponse.json({ error: "No text returned from Gemini" });
            }
        } catch {
            // 如果直接解析失败，尝试用正则提取 JSON 块
            if (text != null) {
                const match = text.match(/\{[\s\S]*}/);
                if (match) {
                    try {
                        const json = JSON.parse(match[0]);
                        return NextResponse.json(json);
                    } catch {}
                }
            } else {
                return NextResponse.json({ error: "No text returned from Gemini" });
            }
            return NextResponse.json({ error: "Invalid JSON from Gemini", raw: text });
        }
    } catch (error) {
        console.error("Error in Gemini API:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}

import { NextResponse } from "next/server";

// Set Cookie
export async function POST(req, res) {
    const jsonBody = await req.json();

    let lang = jsonBody["language"];
    let theme = jsonBody["theme"];

    return NextResponse.json(
        {
            message: "Cookie Saved!",
            lang: lang,
            theme: theme,
        },
        {
            status: 200,
            headers: {
                "Set-Cookie": `lang = ${lang}, theme = ${theme}, path = /`,
            },
        }
    );
}


// Get Cookie
export async function GET(req, res) {
    
     const lang = req.cookies.get('lang')?.value
     const theme = req.cookies.get('theme')?.value


    return NextResponse.json({
        lang:lang,
        theme:theme
    })

}


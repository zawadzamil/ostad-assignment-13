import { NextResponse } from "next/server";

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

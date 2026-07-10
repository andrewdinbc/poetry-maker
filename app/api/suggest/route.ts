import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { word, context, theme = 'poetry' } = await request.json()

    if (!word) {
      return NextResponse.json(
        { error: 'Word is required' },
        { status: 400 }
      )
    }

    const prompt = `You are a creative writing assistant specializing in poetry. 
A user is writing poetry and wants alternative words for the word "${word}" in this context:

"${context}"

The theme is: ${theme}

Generate exactly 5 alternative words that:
1. Have similar meaning or could work in the same context
2. Enhance the poetic quality
3. Maintain rhythm and flow
4. Are relevant to the theme

Return ONLY a JSON array of 5 words, nothing else. Example format:
["word1", "word2", "word3", "word4", "word5"]`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let suggestions: string[] = []
    try {
      suggestions = JSON.parse(content.text)
      if (!Array.isArray(suggestions)) {
        suggestions = [content.text]
      }
    } catch {
      suggestions = content.text.split('\n').filter(s => s.trim().length > 0)
    }

    return NextResponse.json({
      suggestions: suggestions.slice(0, 5),
      word,
    })
  } catch (error) {
    console.error('Error in /api/suggest:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}

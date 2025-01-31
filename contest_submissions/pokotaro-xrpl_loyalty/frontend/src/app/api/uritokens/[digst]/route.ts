import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

const xahauExplorerUrl = 'https://test.xahauexplorer.com/en/nft/'

async function generateStylishIDCardSVG(
  degit: string,
  explorerUrl: string
): Promise<string> {
  const width = 450
  const height = 230
  const gradientId = 'cardGradient'
  const textColor = '#fff'
  const shadowColor = 'rgba(0, 0, 0, 0.2)'

  const qrCodeSVG = await QRCode.toString(explorerUrl, { type: 'svg' })

  // SVGの文字列を生成
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- グラデーション定義 -->
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#555;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#333;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- カードの背景 -->
      <rect width="100%" height="100%" fill="url(#${gradientId})" rx="15" ry="15" />
      <!-- カードの影 -->
      <rect width="100%" height="100%" fill="none" stroke="${shadowColor}" stroke-width="2" rx="15" ry="15" />
      <!-- テキスト -->
      <text x="20" y="50" font-family="Arial" font-size="24" font-weight="bold" fill="${textColor}">Employee ID Card</text>
      <text x="20" y="210" font-family="Arial" font-size="10" fill="${textColor}">${degit}</text>
      <!-- QRコード -->
      <g transform="translate(255, 20) scale(0.5)">
        ${qrCodeSVG}
      </g>
    </svg>
  `.trim()

  return svg
}

async function generateStylishIDCardSVGDataURL(
  degit: string,
  explorerUrl: string
): Promise<string> {
  const svgContent = await generateStylishIDCardSVG(degit, explorerUrl)
  const encodedSVG = encodeURIComponent(svgContent)
  return `data:image/svg+xml;utf8,${encodedSVG}`
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ digst: string }> }
) {
  const digest = (await params).digst
  const { searchParams } = new URL(request.url)
  const tokenID = searchParams.get('tokenID') as string

  return NextResponse.json({
    name: 'Employee ID Card',
    description: 'Employee ID Card',
    image: await generateStylishIDCardSVGDataURL(
      digest,
      `${xahauExplorerUrl}${tokenID}`
    )
  })
}

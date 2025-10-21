import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { airline: string } }
) {
  try {
    const airlineCode = params.airline.toUpperCase();
    
    // Read the contactairlines.json file from public directory
    const filePath = path.join(process.cwd(), 'public', 'contactairlines.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const airlines = JSON.parse(fileContents);
    
    // Find airline by IATA code (case-insensitive)
    const airlineData = airlines.find((airline: any) => 
      airline.iata_code && airline.iata_code.toUpperCase() === airlineCode
    );
    
    if (!airlineData) {
      return NextResponse.json(
        { 
          error: 'Airline not found', 
          message: `No airline found with IATA code: ${airlineCode}`,
          searched_code: airlineCode
        },
        { status: 404 }
      );
    }
    
    // Return the airline contact information
    return NextResponse.json(airlineData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
    
  } catch (error) {
    console.error('Error reading contactairlines.json:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to read airline contact data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST/PUT methods if you want to update data
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours


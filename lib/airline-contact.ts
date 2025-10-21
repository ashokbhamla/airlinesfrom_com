/**
 * Airline Contact Information API
 * Fetches airline contact details from local contactairlines.json
 */

export interface AirlineContact {
  name: string;
  country_code: string;
  iata_code: string;
  website: string;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  instagram_url: string;
  phone: string;
  short_name: string;
  tripadvisor_url: string;
  wikipedia_url: string;
  address: string;
  country: string;
  zipcode: string;
}

/**
 * Fetch airline contact information by IATA code
 * @param iataCode - 2-letter IATA code (e.g., 'DL', 'AI', 'AA')
 * @returns Airline contact information or null
 */
export async function fetchAirlineContact(iataCode: string): Promise<AirlineContact | null> {
  try {
    const response = await fetch(`/api/contact/${iataCode.toLowerCase()}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      console.warn(`Airline contact not found for: ${iataCode}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching airline contact for ${iataCode}:`, error);
    return null;
  }
}

/**
 * Get airline contact info on server side (direct JSON read)
 * @param iataCode - 2-letter IATA code
 * @returns Airline contact information or null
 */
export async function getAirlineContactServer(iataCode: string): Promise<AirlineContact | null> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'contactairlines.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const airlines: AirlineContact[] = JSON.parse(fileContents);
    
    const airlineData = airlines.find((airline: AirlineContact) => 
      airline.iata_code && airline.iata_code.toUpperCase() === iataCode.toUpperCase()
    );
    
    return airlineData || null;
  } catch (error) {
    console.error(`Error reading airline contact for ${iataCode}:`, error);
    return null;
  }
}


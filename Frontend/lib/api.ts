// API configuration and utility functions for Django REST API integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export interface Player {
  id: number
  name: string
  team?: string
}

export interface Team {
  id: number
  name: string
  player1: string
  player2: string
}

export interface Set {
  id: number
  team_a_score: number
  team_b_score: number
  set_number: number
}

export interface MatchDay {
  id: number
  team_a: string
  team_b: string
  winner: string
  date: string
  sets?: Set[]
}

export interface Stats {
  team: string
  matches_won: number
  sets_won: number
  points: number
  deuce_wins: number
  streak: number
}

// Generic API fetch function with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: "no-store", // Always fetch fresh data
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    throw error
  }
}

// API functions for each endpoint
export const api = {
  // Get all players
  getPlayers: (): Promise<Player[]> => apiRequest("/players/"),

  // Get all teams
  getTeams: (): Promise<Team[]> => apiRequest("/teams/"),

  // Get all match days
  getMatchDays: (): Promise<MatchDay[]> => apiRequest("/matchdays/"),

  // Get single match day with sets
  getMatchDay: (id: string): Promise<MatchDay> => apiRequest(`/matchdays/${id}/`),

  // Get stats and leaderboard
  getStats: (): Promise<Stats[]> => apiRequest("/stats/"),
}

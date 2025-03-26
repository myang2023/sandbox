

export const BASE_URL = process.env.BASE_URL_ADDRESS;


export const NO_CACHE_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
}

export const ONE_MIN_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=60',
}

export const ONE_HR_HEADER = {
    'Content-Type': 'application/json',
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=60"
}

export const FOUR_HR_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=14400, s-maxage=14400, stale-while-revalidate=60',
}

export const SIX_HR_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=21600, s-maxage=21600, stale-while-revalidate=60',
}

export const TWELVE_HR_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=60',
}


export const ONE_DAY_HEADER = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=60',
}
import * as fs from 'fs';

interface DistrictData {
    district: string;
    major_cities: string[];
}

function getDistrictData(): { [key: string]: DistrictData } {
    try {
        const data = fs.readFileSync('./database/districts.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading districts data:", err);
        process.exit(1);
    }
}

const tamilNaduDistricts: { [key: string]: DistrictData } = getDistrictData();

function levenshteinDistance(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp[m][n];
}

function getDistrict(city: string): string | undefined {
    const cityLower = city.toLowerCase();
    let minDistance = Infinity;
    let closestDistrict: string | undefined;

    for (const district in tamilNaduDistricts) {
        const districtNameLower = tamilNaduDistricts[district].district.toLowerCase();
        if (cityLower === districtNameLower) {
            return district;
        }
        const cities = tamilNaduDistricts[district].major_cities;
        for (const c of cities) {
            const distance = levenshteinDistance(cityLower, c.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                closestDistrict = district;
            }
        }
    }
    return closestDistrict;
}

function getCities(district: string): string[] | undefined {
    const data = tamilNaduDistricts[district];
    return data ? data.major_cities : undefined;
}

function main(): void {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.log("\x1b[31m\nUsage:\x1b[0m tnweb \x1b[33m<searchType: district | city>\x1b[0m \x1b[34m<searchTerm>\n\x1b[0m");
        return;
    }
    const searchType = args[0];
    const searchTerm = args[1].toLowerCase();

    if (searchType !== "district" && searchType !== "city") {
        console.log("\x1b[31m\nInvalid search type.\x1b[0m Please specify \x1b[33m'district'\x1b[0m or \x1b[33m'city'\n\x1b[0m.");
        return;
    }

    if (searchType === "district") {
        const cities = getCities(searchTerm);
        if (cities) {
            console.log(`\x1b[32m\nMajor cities in ${searchTerm}:\n\x1b[0m`);
            cities.forEach(city => console.log(`\x1b[36m> ${city}\n\x1b[0m`));
        } else {
            console.log(`\x1b[31m\nDistrict "${searchTerm}" not found.\n\x1b[0m`);
        }
    } else if (searchType === "city") {
        const district = getDistrict(searchTerm);
        if (district) {
            const cities = getCities(district);
            if (cities && cities.includes(searchTerm)) {
                console.log(`\x1b[32m\nThe city "${searchTerm}" is in the district:\x1b[0m ${district}\n`);
            } else {
                console.log(`\x1b[31m\nCity "${searchTerm}" not found in the database.\n\x1b[0m`);
            }
        } else {
            console.log(`\x1b[31m\nCity "${searchTerm}" not found in the database.\n\x1b[0m`);
        }
    }
}

main();
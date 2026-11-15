
import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
    description: "Get the current weather condition and temperature for a specific city provided",
    inputSchema: z.object({
        city: z.string().describe("the city name for which need to get weather details"),
    }),
    execute: async ({ city }) => {
        const trimmedCity = city?.trim();
        if (!trimmedCity) {
            return { error: "Please provide a valid city name." };
        }

        try {
            const res = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(trimmedCity)},IN?unitGroup=metric`
            );

            if (!res.ok) {
                return {
                    error: `Could not find weather data for "${trimmedCity}". Please check the city name.`,
                };
            }

            const data = await res.json();

            if (!data?.days || data.days.length === 0) {
                return {
                    error: `No weather forecast available for "${trimmedCity}".`,
                };
            }

            const { tempmax, tempmin, temp } = data.days[0];
            return {
                city: trimmedCity,
                tempmax,
                tempmin,
                temp,
            };
        } catch (error) {
            console.error("Weather tool error: ", error);
            return {
                error: `Failed to retrieve weather for "${trimmedCity}". Please check the city name.`,
            };
        }
    },
});
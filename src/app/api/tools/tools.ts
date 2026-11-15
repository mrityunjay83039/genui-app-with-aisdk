
import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
    description: "Get the current weather condition and temperature for a specific city provided",
    inputSchema: z.object({
        city: z.string().describe("the city name for which need to get weather details"),
    }),
    execute: async ({ city }) => {

        if (city === "") {
            return;
        }

        try {
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},IN?unitGroup=metric`)
            const data = await res.json();

            const { tempmax, tempmin, temp } = data.days[0];
            return {
                city,
                tempmax,
                tempmin,
                temp
            }

        } catch (error) {
            console.error("error: ", error);

            if (error instanceof Error) {
                Response.json({ error: "Something went wrong" }, { status: 500 })
            }

        }


    }
})
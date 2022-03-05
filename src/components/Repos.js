import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
    const { repos } = React.useContext(GithubContext);
    // Getting the top 5 mostused languages in Repos in chartData format
    const languages = repos.reduce((total, item) => {
        const { language, stargazers_count } = item;
        if (!language) return total;
        if (!total[language]) {
            return {
                ...total,
                [language]: {
                    label: language,
                    value: 1,
                    stars: stargazers_count,
                },
            };
        } else {
            return {
                ...total,
                [language]: {
                    ...total[language],
                    value: total[language].value + 1,
                    stars: total[language].stars + stargazers_count,
                },
            };
        }
    }, {});
    console.log(languages);
    const mostUsed = Object.values(languages)
        .sort((a, b) => {
            return b.value - a.value;
        })
        .slice(0, 5);

    // Getting the most stared languages.
    const mostStars = Object.values(languages)
        .sort((a, b) => {
            return b.stars - a.stars;
        })
        .slice(0, 5)
        .map((item) => ({ ...item, value: item.stars }));

    // Dummy Data
    const chartData = [
        {
            label: "Venezuela",
            value: "290",
        },
        {
            label: "Saudi",
            value: "260",
        },
        {
            label: "Canada",
            value: "180",
        },
        {
            label: "Iran",
            value: "140",
        },
        {
            label: "Russia",
            value: "115",
        },
    ];

    return (
        <section className="section">
            <Wrapper className="section-center">
                {/* <ExampleChart data={chartData} /> */}
                <Pie3D data={mostUsed} />
                <Column3D data={chartData} />

                <Doughnut2D data={mostStars} />
                <Bar3D data={chartData} />
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    gap: 2rem;
    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
        grid-template-columns: 2fr 3fr;
    }

    div {
        width: 100% !important;
    }
    .fusioncharts-container {
        width: 100% !important;
    }
    svg {
        width: 100% !important;
        border-radius: var(--radius) !important;
    }
`;

export default Repos;

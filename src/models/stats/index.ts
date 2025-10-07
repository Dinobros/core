import { average, range, sum, zip } from "@byloth/core";
import type { StatsDataV3 as StatsData } from "./types.js";

const _ratio = (part: number, total: number): number =>
{
    if (!(part) || !(total)) { return 0; }

    return part / total;
};

export function getEmptyStats(key: string): StatsData
{
    return {
        date: new Date(key),
        users: { new: 0, active: 0, returning: 0 },
        sessions: {
            active: 0,
            averageTime: 0,
            hours: range(24)
                .map(() => 0)
                .toArray()
        },
        devices: {
            total: 0,
            formFactor: {
                mobile: { total: 0, ratio: 0 },
                tablet: { total: 0, ratio: 0 },
                desktop: { total: 0, ratio: 0 }
            },
            systems: {
                android: { total: 0, ratio: 0 },
                apple: { total: 0, ratio: 0 },
                windows: { total: 0, ratio: 0 },
                others: { total: 0, ratio: 0 }
            }
        },
        games: { new: 0, completed: 0, abandoned: 0, ratio: 0 },
        quizzes: {
            new: 0,
            completed: 0,
            abandoned: 0,
            ratio: 0,
            questions: { },
            answers: { total: 0, right: 0, wrong: 0, ratio: 0 }
        },
        events: { },
        version: 3
    };
}

export const statsAggregator = (_: string, aggregatedStats: StatsData, stats: StatsData): StatsData =>
{
    aggregatedStats.users.new += stats.users.new;
    aggregatedStats.users.active += stats.users.active;
    aggregatedStats.users.returning += stats.users.returning;

    const values = [aggregatedStats.sessions.averageTime, stats.sessions.averageTime];
    const weights = [aggregatedStats.sessions.active || 1, stats.sessions.active || 1];

    aggregatedStats.sessions.active += stats.sessions.active;
    aggregatedStats.sessions.averageTime = average(values, weights);
    aggregatedStats.sessions.hours = zip(aggregatedStats.sessions.hours, stats.sessions.hours)
        .map(sum)
        .toArray();

    aggregatedStats.devices.total += stats.devices.total;
    aggregatedStats.devices.formFactor.mobile.total += stats.devices.formFactor.mobile.total;
    aggregatedStats.devices.formFactor.tablet.total += stats.devices.formFactor.tablet.total;
    aggregatedStats.devices.formFactor.desktop.total += stats.devices.formFactor.desktop.total;
    aggregatedStats.devices.systems.android.total += stats.devices.systems.android.total;
    aggregatedStats.devices.systems.apple.total += stats.devices.systems.apple.total;
    aggregatedStats.devices.systems.windows.total += stats.devices.systems.windows.total;
    aggregatedStats.devices.systems.others.total += stats.devices.systems.others.total;

    aggregatedStats.games.new += stats.games.new;
    aggregatedStats.games.completed += stats.games.completed;
    aggregatedStats.games.abandoned += stats.games.abandoned;

    aggregatedStats.quizzes.new += stats.quizzes.new;
    aggregatedStats.quizzes.completed += stats.quizzes.completed;
    aggregatedStats.quizzes.abandoned += stats.quizzes.abandoned;

    for (const [questionId, answerStats] of Object.entries(stats.quizzes.questions))
    {
        const _questionId = Number(questionId);

        let question = aggregatedStats.quizzes.questions[_questionId];
        if (!(question))
        {
            question = { total: 0, right: 0, wrong: 0, ratio: 0 };
            aggregatedStats.quizzes.questions[_questionId] = question;
        }

        question.total += answerStats.total;
        question.right += answerStats.right;
        question.wrong += answerStats.wrong;
    }

    aggregatedStats.quizzes.answers.total += stats.quizzes.answers.total;
    aggregatedStats.quizzes.answers.right += stats.quizzes.answers.right;
    aggregatedStats.quizzes.answers.wrong += stats.quizzes.answers.wrong;

    for (const [eventName, count] of Object.entries(stats.events))
    {
        if (!(eventName in aggregatedStats.events)) { aggregatedStats.events[eventName] = 0; }

        aggregatedStats.events[eventName] += count;
    }

    return aggregatedStats;
};

export const statsRatioComputer = (_: string, stats: StatsData): StatsData =>
{
    stats.devices.formFactor.mobile.ratio = _ratio(stats.devices.formFactor.mobile.total, stats.devices.total);
    stats.devices.formFactor.tablet.ratio = _ratio(stats.devices.formFactor.tablet.total, stats.devices.total);
    stats.devices.formFactor.desktop.ratio = _ratio(stats.devices.formFactor.desktop.total, stats.devices.total);

    stats.devices.systems.android.ratio = _ratio(stats.devices.systems.android.total, stats.devices.total);
    stats.devices.systems.apple.ratio = _ratio(stats.devices.systems.apple.total, stats.devices.total);
    stats.devices.systems.windows.ratio = _ratio(stats.devices.systems.windows.total, stats.devices.total);
    stats.devices.systems.others.ratio = _ratio(stats.devices.systems.others.total, stats.devices.total);

    stats.games.ratio = _ratio(stats.games.completed, stats.games.new);
    stats.quizzes.ratio = _ratio(stats.quizzes.completed, stats.quizzes.new);

    for (const answerStats of Object.values(stats.quizzes.questions))
    {
        answerStats.ratio = _ratio(answerStats.right, answerStats.total);
    }

    stats.quizzes.answers.ratio = _ratio(stats.quizzes.answers.right, stats.quizzes.answers.total);

    return stats;
};

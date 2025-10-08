import { average, range, sum, zip } from "@byloth/core";
import type { StatsDataV3 as StatsData } from "./types.js";

const _check = (value: number): number => value ? value : 0;
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
    aggregatedStats.users.new += _check(stats.users.new);
    aggregatedStats.users.active += _check(stats.users.active);
    aggregatedStats.users.returning += _check(stats.users.returning);

    const values = [aggregatedStats.sessions.averageTime, _check(stats.sessions.averageTime)];
    const weights = [aggregatedStats.sessions.active || 1, stats.sessions.active || 1];

    aggregatedStats.sessions.active += _check(stats.sessions.active);
    aggregatedStats.sessions.averageTime = average(values, weights);
    aggregatedStats.sessions.hours = zip(aggregatedStats.sessions.hours, stats.sessions.hours.map(_check))
        .map(sum)
        .toArray();

    aggregatedStats.devices.total += _check(stats.devices.total);
    aggregatedStats.devices.formFactor.mobile.total += _check(stats.devices.formFactor.mobile.total);
    aggregatedStats.devices.formFactor.tablet.total += _check(stats.devices.formFactor.tablet.total);
    aggregatedStats.devices.formFactor.desktop.total += _check(stats.devices.formFactor.desktop.total);
    aggregatedStats.devices.systems.android.total += _check(stats.devices.systems.android.total);
    aggregatedStats.devices.systems.apple.total += _check(stats.devices.systems.apple.total);
    aggregatedStats.devices.systems.windows.total += _check(stats.devices.systems.windows.total);
    aggregatedStats.devices.systems.others.total += _check(stats.devices.systems.others.total);

    aggregatedStats.games.new += _check(stats.games.new);
    aggregatedStats.games.completed += _check(stats.games.completed);
    aggregatedStats.games.abandoned += _check(stats.games.abandoned);

    aggregatedStats.quizzes.new += _check(stats.quizzes.new);
    aggregatedStats.quizzes.completed += _check(stats.quizzes.completed);
    aggregatedStats.quizzes.abandoned += _check(stats.quizzes.abandoned);

    for (const [questionId, answerStats] of Object.entries(stats.quizzes.questions))
    {
        const _questionId = Number(questionId);

        let question = aggregatedStats.quizzes.questions[_questionId];
        if (!(question))
        {
            question = { total: 0, right: 0, wrong: 0, ratio: 0 };
            aggregatedStats.quizzes.questions[_questionId] = question;
        }

        question.total += _check(answerStats.total);
        question.right += _check(answerStats.right);
        question.wrong += _check(answerStats.wrong);
    }

    aggregatedStats.quizzes.answers.total += _check(stats.quizzes.answers.total);
    aggregatedStats.quizzes.answers.right += _check(stats.quizzes.answers.right);
    aggregatedStats.quizzes.answers.wrong += _check(stats.quizzes.answers.wrong);

    for (const [eventName, count] of Object.entries(stats.events))
    {
        if (!(eventName in aggregatedStats.events)) { aggregatedStats.events[eventName] = 0; }

        aggregatedStats.events[eventName] += _check(count);
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

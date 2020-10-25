export const generatePhaseColor = (phases, birthDate) => {
    let calendarBlocks = Array(phases[0].date[0].diff(birthDate, "week")).fill({ color: "none" });
    let last = null;

    phases.forEach((phase, index) => {
        if (!phase) {
            return;
        }

        let phaseLength = phase.date[1].diff(phase.date[0], "week");

        let nextEmptyBlocksLength = 0;

        if (phases.length > index + 1 && phases[index + 1] != null) {
            nextEmptyBlocksLength = Math.abs(phase.date[1].diff(phases[index + 1].date[0], "week"));
        }

        calendarBlocks = [
            ...calendarBlocks,
            ...Array(phaseLength).fill({ color: phase.color }),
            ...Array(nextEmptyBlocksLength).fill({ color: 'none', }),
        ];

        last = index;
    });

    const lastPhase = birthDate.add(81, 'year').diff(phases[last].date[1], "week")
    calendarBlocks = [...calendarBlocks, ...Array(lastPhase).fill({ color: 'none', })]

    let finalCalendarBlocks = []
    for (let i = 0; i < calendarBlocks.length; i += 52) {
        finalCalendarBlocks.push(calendarBlocks.slice(i, i + 52));
    }

    return finalCalendarBlocks;
}
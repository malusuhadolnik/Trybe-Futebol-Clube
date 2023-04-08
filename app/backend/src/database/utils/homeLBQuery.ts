// uma alternativa de resolução seria possível à partir da versão 8 do mql: as common table expressions
// https://www.mysqltutorial.org/mysql-cte/
// seria possível criar uma espécie de "tabela intermediária virtual e temporária",
// para criar as colunas totalVictories, totalDraws e totalLosses, e a partir delas resolver os demais cálculos
// na ausência desta funcionalidade, a única coisa que testei e funcinou
// foi repetir o calculo em cada uma das colunas em que eles são necessários :(
// porque não é possível referenciar colunas que ainda não foram criadas
// Bibliografia consultada: Course, projeto one for All,
// https://pt.stackoverflow.com/questions/543860/como-usar-case-when-sum-com-group-by

export const homeLBQuery = `
SELECT
    teams.team_name AS name,
    COUNT(matches.id) AS totalGames,
    SUM(
      CASE
        WHEN matches.home_team_goals > matches.away_team_goals THEN 3
        WHEN matches.home_team_goals = matches.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
        CASE
          WHEN matches.home_team_goals > matches.away_team_goals THEN 1
          ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN matches.home_team_goals = matches.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN matches.home_team_goals < matches.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(matches.home_team_goals) AS goalsFavor,
    SUM(matches.away_team_goals) AS goalsOwn,
    SUM(matches.home_team_goals - matches.away_team_goals) AS goalsBalance,
    ROUND(
        (SUM(
            CASE
                WHEN matches.home_team_goals > matches.away_team_goals THEN 3
                WHEN matches.home_team_goals = matches.away_team_goals THEN 1
                ELSE 0
            END
        ) / (COUNT(matches.id) * 3)) * 100, 2
    ) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS teams
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches
ON teams.id = matches.home_team_id
WHERE matches.in_progress = false
GROUP BY teams.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

export const awayLBQuery = `
SELECT
    teams.team_name AS name,
    COUNT(matches.id) AS totalGames,
    SUM(
      CASE
        WHEN matches.away_team_goals > matches.home_team_goals THEN 3
        WHEN matches.away_team_goals = matches.home_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
        CASE
          WHEN matches.away_team_goals > matches.home_team_goals THEN 1
          ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN matches.away_team_goals = matches.home_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN matches.away_team_goals < matches.home_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(matches.away_team_goals) AS goalsFavor,
    SUM(matches.home_team_goals) AS goalsOwn,
    SUM(matches.away_team_goals - matches.home_team_goals) AS goalsBalance,
    ROUND(
        (SUM(
            CASE
                WHEN matches.away_team_goals > matches.home_team_goals THEN 3
                WHEN matches.away_team_goals = matches.home_team_goals THEN 1
                ELSE 0
            END
        ) / (COUNT(matches.id) * 3)) * 100, 2
    ) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS teams
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches
ON teams.id = matches.away_team_id
WHERE matches.in_progress = false
GROUP BY teams.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

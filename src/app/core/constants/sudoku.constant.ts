export const sudokuInitialPuzzle: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  export const latest_sudoku_game = 'latest_sudoku_game';
  export const latest_sudoku_timer = 'latest_sudoku_timer';

  export const undo_available_moves = 5;

  export const game_levels_dificulty = {
    easy: 2,
    normal: 25,
    hard: 40,
    expert: 60,
  }

  export const game_levels = [
    {
      buttonText: "Easy",
      numberOfRemovedFields: game_levels_dificulty.easy,
    },
    {
      buttonText: "Normal",
      numberOfRemovedFields: game_levels_dificulty.normal,
    },
    {
      buttonText: "Hard",
      numberOfRemovedFields: game_levels_dificulty.hard,
    },
    {
      buttonText: "Expert",
      numberOfRemovedFields: game_levels_dificulty.expert,
    },
  ]
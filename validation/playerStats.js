import Validator from 'validator';
import isEmpty from './is-empty';

const validatePlayerStatsInput = (data) => {
  let errors = {};

  data.totalTimePlayed = !isEmpty(data.totalTimePlayed) ? data.totalTimePlayed : '';
  data.songsPlayed = !isEmpty(data.songsPlayed) ? data.songsPlayed : '';
  data.missionsCompleted = !isEmpty(data.missionsCompleted) ? data.missionsCompleted : '';
  data.lessonsCompleted = !isEmpty(data.lessonsCompleted) ? data.lessonsCompleted : '';
  data.highestArcadeScore = !isEmpty(data.highestArcadeScore) ? data.highestArcadeScore : '';

  if (Validator.isEmpty(data.totalTimePlayed)) {
    errors.totalTimePlayed = 'Total time played field is required';
  }

  if (Validator.isEmpty(data.songsPlayed)) {
    errors.songsPlayed = 'Songs played field is required';
  }

  if (Validator.isEmpty(data.missionsCompleted)) {
    errors.missionsCompleted = 'Missions completed field is required';
  }

  if (Validator.isEmpty(data.lessonsCompleted)) {
    errors.lessonsCompleted = 'Lessons completed field is required';
  }

  if (Validator.isEmpty(data.highestArcadeScore)) {
    errors.highestArcadeScore = 'Highest arcade score field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validatePlayerStatsInput;

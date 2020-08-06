/*import * as ActionTypes from './ActionTypes';

export const Feedback = (state = { errMess: null, feedback:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        
        return { ...state, feedback: state.feedback.concat(feedback)};

    case ActionTypes.FEEDBACK_FAILED:
      return {...state, errMess: action.payload};    

    default:
      return state;
  }
};*/
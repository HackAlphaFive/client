import { TResponseGetSomeUser, T_IPR } from '../../utils/api/types';
import { getUniqArray_number, handleError } from '../../utils/utils';
import { getAnotherUser } from '../middlewares/authQueries';
import { RootState } from '../types';

export const getIPRsError = (state: RootState) => state.iprs.error;

export const getmyIPRsPending = (state: RootState) => state.iprs.myIPRsPending;
export const getmyIPRsSuccess = (state: RootState) => state.iprs.myIPRsSuccess;
export const getmyIPRsFromStore = (state: RootState) => state.iprs.myIPRs;

export const getSubordIPRsPending = (state: RootState) => state.iprs.subordIPRsPending;
export const getSubordIPRsSuccess = (state: RootState) => state.iprs.subordIPRsSuccess;
export const getSubordIPRsFromStore = (state: RootState) => {
  // ЭТО ТОЛЬКО ПЕРВЫЕ ПЯТЬ ИПР БЛИИИИИИИН
  /*const subordIPRs = state.iprs.subordIPRs.results;
  if (state.auth.user && subordIPRs.length > 0) {
    console.log({subordIPRs});
    const id_of_subordinates_with_IPR_repetitive = subordIPRs.map(ipr => ipr.employee.id);
    console.log({id_of_subordinates_with_IPR_repetitive});
    const id_of_subordinates_with_IPR = getUniqArray_number(id_of_subordinates_with_IPR_repetitive);
    console.log({id_of_subordinates_with_IPR});

    let result: {
      hunky: T_IPR[];
      parasites: TResponseGetSomeUser[];
    } = {
      hunky: [],
      parasites: [],
    };
    console.log({result, message: 'result до условия'});

    console.log("Внутри условия");
    const id_of_subordinates = state.auth.user.subordinates;
    console.log({id_of_subordinates});
    const id_of_people_without_IPR = id_of_subordinates.filter(id => id_of_subordinates_with_IPR.indexOf(id) === -1);
    console.log({id_of_people_without_IPR});

    Promise.all(id_of_people_without_IPR.map(id => getAnotherUser(id)))
    .then(parasites => {
      console.log({parasites});
      return { hunky: [...subordIPRs], parasites: [...parasites] };
    })
    .catch(handleError);

    // Видимо не дожидается всех промисов
    console.log({result, message: 'возвращаемый result'});
    return result;
    // Вынести Propmise.all в отдельный запрос и хранить результат в сторе
  }*/
  return {hunky: state.iprs.subordIPRs.results, parasites: []};
};

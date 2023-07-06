import {SmallVideoData} from '../@types/Types';

export const sortAccessDate = (filterType: string, arr: SmallVideoData['videoData'][]) => {
	switch (filterType) {
		case 'newest':
			arr.sort((a, b) => {
				const dateA = new Date(a.access_date).getTime();
				const dateB = new Date(b.access_date).getTime();
				return dateB - dateA;
			});
			return arr;
		case 'oldest':
			arr.sort((a, b) => {
				const dateA = new Date(a.access_date).getTime();
				const dateB = new Date(b.access_date).getTime();
				return dateA - dateB;
			});
			return arr;
		default:
			return arr;
	}
};

export const tutorialHasTagFilter = (tutorialArr: SmallVideoData['videoData'][]) => {
	return tutorialArr.filter((tutorial) => tutorial.tags);
};

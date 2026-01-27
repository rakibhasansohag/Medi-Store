import { IPaginationOptions, IPaginationResult } from './../src/types/index';

const paginationSortingHelper = (
	options: IPaginationOptions,
): IPaginationResult => {
	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip = (page - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	return {
		page,
		limit,
		skip,
		sortBy,
		sortOrder,
	};
};

export default paginationSortingHelper;

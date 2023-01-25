import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getMails,
	markRead,
	selectFilter,
	toggleEmailBody,
	incrementPage,
	decrementPage,
} from "../../features/EmailSlice";
import "./Filter.css";

export const Filter = () => {
	const { selectedFilter, selectedMail, page } = useSelector(
		(state) => state.email
	);
	const dispatch = useDispatch();

	const disableNav = () => {
		let totalPages = 2;
		return totalPages - page;
	};

	useEffect(() => {
		dispatch(getMails(page));
	}, [page]);
	return (
		<header className='head'>
			<section className='filter'>
				Filter By:
				<span
					className={`${selectedFilter === "Unread" ? "filtered" : ""}`}
					onClick={(e) => {
						dispatch(markRead(selectedMail.id));
						dispatch(selectFilter(e.target.innerText));
					}}>
					Unread
				</span>
				<span
					className={`${selectedFilter === "Read" ? "filtered" : ""}`}
					onClick={(e) => {
						dispatch(markRead(selectedMail.id));
						dispatch(selectFilter(e.target.innerText));
					}}>
					Read
				</span>
				<span
					className={`${selectedFilter === "Favorites" ? "filtered" : ""}`}
					onClick={(e) => {
						dispatch(markRead(selectedMail.id));
						dispatch(selectFilter(e.target.innerText));
					}}>
					Favorites
				</span>
				<span
					className='ClearFilter'
					onClick={() => {
						dispatch(selectFilter(null));
					}}>
					Clear
				</span>
			</section>
			<section className='paginate'>
				<div onClick={() => {}}>
					<button
						className={`pageNav ${disableNav() > 0 ? "disabled" : null}`}
						disabled={disableNav() > 0}
						onClick={() => {
							dispatch(decrementPage());
							dispatch(toggleEmailBody(selectedMail));
						}}>
						{"<"}
					</button>
					<span className='pageNo'>{page + " "} </span>
					<button
						className={`pageNav ${disableNav() < 1 ? "disabled" : null}`}
						disabled={disableNav() < 1}
						onClick={() => {
							dispatch(incrementPage());
							dispatch(toggleEmailBody(selectedMail));
						}}>
						{">"}
					</button>
				</div>
			</section>
		</header>
	);
};

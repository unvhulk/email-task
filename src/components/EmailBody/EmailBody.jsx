import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/EmailSlice";
import "./EmailBody.css";

export const EmailBody = () => {
	const { mailBody, open, selectedMail, favorite } = useSelector(
		(state) => state.email
	);
	const dispatch = useDispatch();

	let date = new Date(selectedMail?.date)
		.toLocaleString("en-AU", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
		.replace(",", "")
		.toLowerCase();

	date = date.split(" ").slice(0, -1).join(" ") + date.split(" ").slice(-1);

	return (
		<section
			className={` ${open ? "EmailBodyCompContainer" : "removeContainer"}`}>
			<div className='header-container'>
				<div className='avatar emailBody'>
					{selectedMail?.from?.name.charAt(0).toUpperCase()}
				</div>
				<div className='heading'>
					<span>{` ${selectedMail?.subject}`}</span>
				</div>
				<div
					className='favoriteButton'
					onClick={() => dispatch(toggleFavorite(selectedMail.id))}>
					{`${
						favorite.includes(selectedMail.id)
							? "Unmark as favorite"
							: "Mark as favorite"
					}`}
				</div>
				<div className='date emailBody'>{date}</div>
			</div>
			<div className='body emailBody'>
				<div
					className='description'
					dangerouslySetInnerHTML={{ __html: `${mailBody}` }}
				/>
			</div>
		</section>
	);
};

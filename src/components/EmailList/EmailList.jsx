import { useDispatch, useSelector } from "react-redux";
import "./EmailList.css";

export const EmailList = ({ mail, onClick, selected }) => {
	const { read, favorite } = useSelector((state) => state.email);

	let date = new Date(mail.date)
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
			className={`ListCompContainer ${selected ? "selectBorder" : null} ${
				read.includes(mail.id) ? "read" : "unread"
			}`}
			onClick={onClick}>
			<div className='avatar-container'>
				<div className='avatar'>{mail.from.name.charAt(0).toUpperCase()}</div>
			</div>
			<div className='list-container'>
				<div className='from'>
					From:<span>{` ${mail.from.name} <${mail.from.email}>`}</span>
				</div>
				<div className='subject'>
					Subject:<span>{` ${mail.subject}`}</span>
				</div>
				<div className='description'>{mail.short_description}</div>
				<div className='inline'>
					<div className='date'>{date}</div>
					<div
						className={`${
							favorite.includes(mail.id) ? "favorite" : "removeContainer"
						}`}>
						Favorite
					</div>
				</div>
			</div>
		</section>
	);
};

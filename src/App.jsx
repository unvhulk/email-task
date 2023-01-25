import { useEffect } from "react";
import { EmailList, EmailBody, Loader, Filter } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
	getMails,
	getMailBody,
	toggleEmailBody,
	markRead,
} from "./features/EmailSlice";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const {
		mails,
		statusMail,
		statusBody,
		selectedFilter,
		selectedMail,
		open,
		favorite,
		read,
		page,
	} = useSelector((state) => state.email);

	const filterMail = (mail) => {
		switch (selectedFilter) {
			case "Favorites":
				return favorite.includes(mail.id);
			case "Read":
				return read.includes(mail.id);
			case "Unread":
				return !read.includes(mail.id);
			default:
				return true;
		}
	};

	let filteredItems = mails?.filter((mail) => filterMail(mail)).length;

	const onClickMail = (mail) => {
		dispatch(toggleEmailBody(mail));
		if (open) {
			dispatch(markRead(selectedMail.id));
		}
		if (mail.id !== selectedMail.id) {
			dispatch(getMailBody(mail.id));
			if (open) {
				dispatch(markRead(selectedMail.id));
			}
		}
	};

	useEffect(() => {
		dispatch(getMails(page));
	}, []);

	return (
		<div className='App'>
			<Filter />
			<main className={`main ${open ? "BodyColumns" : ""}`}>
				{statusMail === "loading" ? (
					<Loader />
				) : (
					<>
						<section className='master'>
							{/* For Empty state management */}
							{!filteredItems ? (
								<div className='EmptyState'>
									There are no {selectedFilter} mails on this page
								</div>
							) : (
								// For Mail list rendering
								mails
									?.filter((mail) => filterMail(mail))
									.map((mail) => {
										return (
											<EmailList
												mail={mail}
												key={mail.id}
												onClick={() => onClickMail(mail)}
												selected={mail.id === selectedMail.id ? true : false}
											/>
										);
									})
							)}
						</section>
						{statusBody === "loading" ? (
							<Loader />
						) : (
							//For Mail's Body
							<section className='slave'>
								<EmailBody />
							</section>
						)}
					</>
				)}
			</main>
		</div>
	);
}

export default App;

import { Button } from '@material-ui/core';
import { CoupleContext } from 'context/CoupleContext';
import { TransactionContext } from 'context/TransactionContext';
import { sendEmailToCouple } from 'net/email';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
	transactionId: string;
	voucherRef?: React.RefObject<HTMLButtonElement>;
};

const UploadButton = ({ transactionId, voucherRef }: Props): JSX.Element => {
	const { approveTransaction, fetchTransaction } =
		useContext(TransactionContext);
	const { getCouple } = useContext(CoupleContext);
	const { id: coupleId, ...couple } = getCouple() || {
		id: '',
		slug: '',
		title: '',
		headerImgUrl: '',
		email: '',
		bank: { name: '', alias: '', cbu: '' },
		mp: false,
		rsvpUrl: '',
	};
	// const { id: coupleId, slug } = couple;
	const history = useHistory();
	const doUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		// TODO: upload file to firebase, if successful then notify/set transaction to approved
		return approveTransaction(transactionId, coupleId).then(result => {
			if (result) {
				fetchTransaction(transactionId, coupleId)
					.then(transaction => {
						sendEmailToCouple(transaction, couple).catch(err => console.error(err));
					})
					.catch(error => console.error(error));
				history.push(`/${couple.slug}/thanks`);
			} else {
				console.error('Error uploading transaction receipt.');
			}
		});
	};

	return (
		<Button
			variant='contained'
			component='label'
			size='large'
			color='primary'
			innerRef={voucherRef}
			data-cy='uploadButton'
		>
			Subir comprobante
			<input type='file' multiple={false} hidden onChange={e => doUpload(e)} />
		</Button>
	);
};

export default UploadButton;

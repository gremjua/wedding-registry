import { Button } from '@material-ui/core';
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
	const history = useHistory();
	const doUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		// TODO: upload file to firebase, if successful then notify/set transaction to approved
		return approveTransaction(transactionId).then(result => {
			if (result) {
				fetchTransaction(transactionId)
					.then(transaction => {
						sendEmailToCouple(transaction).catch(err => console.error(err));
					})
					.catch(error => console.error(error));
				history.push('/thanks');
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
		>
			Subí el comprobante
			<input type='file' multiple={false} hidden onChange={e => doUpload(e)} />
		</Button>
	);
};

export default UploadButton;

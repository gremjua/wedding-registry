import React, { useContext, useEffect, useState } from 'react';
import { GiftItemsContext } from 'context/GiftItemsContext';
import Loading from 'components/common/Loading';
import { CoupleContext } from 'context/CoupleContext';
import { useParams } from 'react-router-dom';

const AppContainer = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { fetchItems, isLoading, setIsLoading } = useContext(GiftItemsContext);
	const { fetchCoupleBySlug, setCouple } = useContext(CoupleContext);
	const { coupleSlug } = useParams<{ coupleSlug: string }>();
	const [isCoupleValid, setIsCoupleValid] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		fetchCoupleBySlug(coupleSlug).then(couple => {
			if (couple) {
				setCouple(couple);
				fetchItems().finally(() => {
					setIsLoading(false);
				});
			} else {
				setIsCoupleValid(false);
			}
		});
	}, []);
	if (isLoading) {
		return <Loading />;
	}
	return <>{isCoupleValid ? children : <h6>La pareja es inválida</h6>}</>;
};

export default AppContainer;

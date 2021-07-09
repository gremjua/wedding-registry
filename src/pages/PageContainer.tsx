import React, { useContext, useEffect } from 'react';
import { GiftItemsContext } from 'context/GiftItemsContext';
import Loading from 'components/common/Loading';

const PageContainer = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { fetchItems, isLoading, setIsLoading } = useContext(GiftItemsContext);
	useEffect(() => {
		setIsLoading(true);
		fetchItems().finally(() => {
			setIsLoading(false);
		});
	}, []);
	return <>{isLoading ? <Loading /> : children}</>;
};

export default PageContainer;

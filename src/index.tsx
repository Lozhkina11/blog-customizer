import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../src/constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [statusPage, setStatusPage] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': statusPage.fontFamilyOption.value,
					'--font-size': statusPage.fontSizeOption.value,
					'--font-color': statusPage.fontColor.value,
					'--container-width': statusPage.contentWidth.value,
					'--bg-color': statusPage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setStatusPage={setStatusPage} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

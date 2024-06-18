import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [StatusPage, setStatusPage] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': StatusPage.fontFamilyOption.value,
					'--font-size': StatusPage.fontSizeOption.value,
					'--font-color': StatusPage.fontColor.value,
					'--container-width': StatusPage.contentWidth.value,
					'--bg-color': StatusPage.backgroundColor.value,
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

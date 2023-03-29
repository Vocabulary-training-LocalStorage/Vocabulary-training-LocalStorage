import React, { useEffect, useState, useRef, useContext, Suspense } from 'react';
import Word from './Word';
import AppContext from '../context/Context';

const Words = () => {
	const { datawords, costomcolor, SearchParams } = useContext(AppContext);



const handlesearch=(g)=>{
	if (SearchParams.get("search")) {
		let filteredword= g.persian.toLowerCase().includes(SearchParams.get("search")) +  g.english.toLowerCase().includes(SearchParams.get("search").toLowerCase())
		return  filteredword;
	} else {
		return true;
	}
}
	return (
		<div className="words">
			<ol className=" justify-content-evenly d-flex flex-wrap p-0 ">
				{datawords ?
					datawords
						.filter(handlesearch)
						.map(datawords => {
							return (
								<li className=" xs-12 sm-3 li">
									<Word datawords={datawords} costomcolor={costomcolor} ></Word>
								</li>
							)
						}).reverse() : null}
			</ol>
		</div>

	)
};

export default Words;
import React from 'react';

const NYTIndex = ( props: any) => {

    return(
        <div>
            {props.results.length > 0 && props.results.map((article: any, index: number) => {
                let image;

                {if(article.multimedia.length > 0) {
                    image = `http://www.nytimes.com/${article.multimedia[0].url}`
                }}
                return(
                    <div key={index}>
                        <h4>
                            <a href={article.web_url}>{article.headline.main}</a><br/><br/>
                            <img src={image} style={{ width: '350px', height: '350px'}} alt={article.headline.main}/>
                        </h4>
                        <div>
                            {article.keywords.length > 0 && article.keywords.map((keyword: any, index: number) => {
                                return(
                                    <div key={index}>
                                        <p>{keyword.value}</p>
                                        </div>
                                )
                            })}

                        </div>
                        </div>
                )
            })}

        </div>
    )
}

export default NYTIndex;
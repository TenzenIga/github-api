import React from 'react'
import RepoCard from './RepoCard'
import { CardColumns } from 'reactstrap';

export default function RepoList(props) {
    const {repos} = props;

    const list = repos.map(repo =><RepoCard
            key={repo.id}
            name={repo.name}
            desc={repo.description}
            url={repo.html_url}
            language={repo.language}
            stars={repo.stargazers_count}
        />
    )

    return (
        <CardColumns className='mt-4'>
            {list}
        </CardColumns>
    )
}

// @ts-nocheck
import { useState, useEffect } from "react";
const token = process.env.REACT_APP_TOKEN

function SearchResults(props: {submittedQuery: string}) {
  useEffect(() => {
    if(props.submittedQuery.length > 0){
      getUser(props.submittedQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.submittedQuery]);

  const [user, setUser] = useState({});
  // const [userFollowers, setUserFollowers] = useState();
  const [userFollowersCount, setUserFollowersCount] = useState();
  const [userRepos, setUserRepos] = useState();
  const [userReposCount, setUserReposCount] = useState();
  
  async function getUser(username:string) {
    let followersURL;
    let reposURL;

    const userRes = await fetch(`https://api.github.com/search/users?q=${username}`, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    });
    await userRes.json().then(res => {
      followersURL = res.items[0].followers_url;
      reposURL = res.items[0].repos_url;
      setUser(res.items[0]);
    });

    const userFollowersRes = await fetch(followersURL, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    });
    userFollowersRes.json().then(res => {
      // setUserFollowers(res);
      setUserFollowersCount(res.length);
    });

    const userReposRes = await fetch(reposURL, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    });
    userReposRes.json().then(res => {
      setUserRepos(res);
      setUserReposCount(res.length);
      orderReposByLatest(res);
    });
  }

  function orderReposByLatest(repos){
    let arrSorted = repos.sort((a, b) => 
      b.id - a.id //id are used as a proxy for creation date
    );
    arrSorted = arrSorted.slice(0, 4);
    setUserRepos(arrSorted);
  }

  return (
    <>
      <div>
        <h4>
          Avatar:
        </h4>
        {user.avatar_url &&
          <img src={user.avatar_url} alt="User Avatar" width="100px"></img>
        }
        <h4>
          Username:
        </h4>
        {user.login && user.login}
        <h4>
          Followers:
        </h4>
        {userFollowersCount && userFollowersCount}
        <h4>
          Repository Count:
        </h4>
        {userReposCount && userReposCount}
      </div>
      <div>
        <h3>Most Recent Repositories:</h3>
        {userRepos && userRepos.map(repo => {
          return (
            <div key={repo.id}>
              <p>{repo.name}</p>
              <p>{repo.language}</p>
              <a href={repo.html_url}>{repo.html_url}</a>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SearchResults;
// @ts-nocheck
import { useState, useEffect } from "react";
import token from '../secrets.js'

function SearchResults(props: {submittedQuery: string}) {
  useEffect(() => {
    if(props.submittedQuery.length > 0){
      getUser(props.submittedQuery);
    }
  }, [props.submittedQuery]);

  const [user, setUser] = useState({});
  const [userFollowersCount, setUserFollowersCount] = useState();
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
    })

    const userFollowersRes = await fetch(followersURL, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    })
    userFollowersRes.json().then(res => setUserFollowersCount(res.length));

    const userReposRes = await fetch(reposURL, {
      method: "GET",
      headers: {
        Authorization: `${token}` 
      }
    })
    userReposRes.json().then(res => setUserReposCount(res.length));
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
    </>
  )
}

export default SearchResults;
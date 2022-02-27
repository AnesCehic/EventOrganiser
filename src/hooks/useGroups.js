import {useState, useEffect} from 'react';

import {GroupService} from '../services/apiClient';

const useEvents = () => {
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState(null);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    getGroups();
  }, [shouldRefetch]);

  const getGroups = async () => {
    try {
      setGroupsLoading(true);
      const res = await GroupService.find();
      setGroups(res.data);
      setGroupsLoading(false);
    } catch (error) {
      console.log('[Error fetch groups]', error);
      setGroupsError(error);
      setGroupsLoading(false);
    }
  };

  return {groups, groupsError, groupsLoading, refetch};
};

export default useEvents;

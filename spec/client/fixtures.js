(function() {

  module.exports.simplePeopleListFixture = function simplePeopleListFixture() {
    return JSON.parse(JSON.stringify(
	[
	  { active: true,  name: 'one', email: 'one@example.com' },
	  { active: false, name: 'two', email: 'two@three.four' },
	  { active: false, name: 'three' },
	  { active: true,  name: 'four' }
	]
    ));
  };

  module.exports.projectListFixture = function projectListFixture() {
    return JSON.parse(JSON.stringify(
	[
	  {
	    name: 'Develop New Cruiser (White Star)',
	    id: 17,
	    version: 420,
	    epics: [
	      {
		id: 4201,
		comments: [
		  {
		    id: 998,
		    person_id: 45
		  },
		  {
		    id: 1002,
		    person_id: 627431
		  }
		]
	      },
	    ],
	    stories: [
	      {
		id: 4201,
		name: 'Weapons operator can fire main batteries without automated targeting',
		story_type: 'feature',
		current_state: 'unstarted',
		estimate: 1,
		requested_by_id: 25385,
		comments: []
	      },
	      {
		id: 4202,
		name: 'Hangar bay can recharge Nial fighters',
		story_type: 'feature',
		current_state: 'rejected',
		estimate: 3,
		requested_by_id: 25385,
		comments: [
		  {
		    id: 999,
		    person_id: 44
		  },
		  {
		    id: 1001,
		    person_id: 27161
		  }
		]
	      },
	      {
		id: 4202,
		name: 'Prepare production jump-engine plans based on mini-jump prototype',
		story_type: 'feature',
		current_state: 'accepted',
		estimate: 2,
		requested_by_id: 25385,
		owned_by_id: 43,
		comments: []
	      }
	    ],
	    memberships: [
	      {
		id: 2551933,
		role: 'owner',
		last_viewed_at: 1371603291000,
		person: {
		  kind: 'person',
		  id: 627611,
		  initials: 'u',
		  username: 'ulkesh',
		  name: 'Ulkesh Naranek'
		}
	      },
	      {
		id: 5293351,
		role: 'owner',
		last_viewed_at: 1371063921000,
		person: {
		  kind: 'person',
		  id: 27161,
		  initials: 'jen',
		  username: 'jenimer',
		  name: 'Jenimer of the Grey'
		}
	      },
	      {
		id: 2733915,
		role: 'member',
		last_viewed_at: 1370203291000,
		person: {
		  kind: 'person',
		  id: 627431,
		  initials: 'js',
		  username: 'jeff',
		  name: "Entil'Zha Sinclair"
		}
	      },
	      {
		id: 2551934,
		role: 'member',
		last_viewed_at: 1371603291000,
		person: {
		  kind: 'person',
		  id: 25385,
		  initials: 'ine',
		  username: 'Inesval',
		  name: 'Inesval'
		}
	      },
	      {
		id: 2551955,
		role: 'viewer',
		last_viewed_at: 0,
		person: {
		  kind: 'person',
		  id: 126765,
		  initials: 'pairmatic',
		  username: 'pairmatic42',
		  name: 'Pairmatic Role User'
		}
	      }
	    ]
	  },
	  {
	    name: 'Transport Babylon 4 Back in Time',
	    id: 4,
	    version: 42,
	    epics: [],
	    stories: [
	      {
		id: 421,
		name: 'Get time-stabilizers out of storage and refurbished',
		story_type: 'chore',
		current_state: 'started',
		requested_by_id: 26761,
		owned_by_id: 2766,
		comments: []
	      },
	      {
		id: 421,
		name: "Configure ship's stealth capabilities for boarding B4",
		story_type: 'chore',
		current_state: 'unstarted',
		requested_by_id: 42,
		comments: []
	      }
	    ],
	    memberships: [
	      {
		id: 2551932,
		role: 'member',
		last_viewed_at: 1371603288000,
		person: {
		  kind: 'person',
		  id: 627611,
		  initials: 'u',
		  username: 'ulkesh',
		  name: 'Ulkesh Naranek'
		}
	      },
	      {
		id: 251930,
		role: 'owner',
		last_viewed_at: 1371603291000,
		person: {
		  kind: 'person',
		  id: 26761,
		  initials: 'TGM',
		  username: 'draal',
		  name: 'Draal (The Great Machine)'
		}
	      },
	      {
		id: 251935,
		role: 'member',
		last_viewed_at: 1371603291000,
		person: {
		  kind: 'person',
		  id: 2766,
		  initials: 'zathras',
		  username: 'zathras',
		  name: 'Zathras'
		}
	      },
	      {
		id: 2551944,
		role: 'viewer',
		last_viewed_at: 0,
		person: {
		  kind: 'person',
		  id: 126765,
		  initials: 'pairmatic',
		  username: 'pairmatic42',
		  name: 'Pairmatic Role User'
		}
	      }
	    ]
	  }
	]
    ));
  };

  module.exports.listOfPeopleFixture = function listOfPeopleFixture() {
    return JSON.parse(JSON.stringify(
        [
	  {
	    membership_id: 2551933,
	    role: 'owner',
	    last_viewed_at: 1371603291000,
	    active: true,
	    id: 627611,
	    name: 'Ulkesh Naranek',
	    initials: 'u',
	    username: 'ulkesh',
	    email: 'u@vorlon.vorlon'
	  },
	  {
	    membership_id: 5293351,
	    role: 'owner',
	    last_viewed_at: 1371063921000,
	    id: 27161,
	    name: 'Jenimer of the Grey',
	    initials: 'jen',
	    username: 'jenimer',
	    email: 'jenimer@grey.minbar.minbari'
	  },
	  {
	    membership_id: 2733915,
	    role: 'member',
	    last_viewed_at: 1370203291000,
	    id: 627431,
	    name: "Entil'Zha Sinclair",
	    initials: 'js',
	    username: 'jeff',
	    email: 'entilzha@grey.minbar.minbari'
	  },
	  {
	    membership_id: 2551933,
	    role: 'member',
	    last_viewed_at: 1371603291000,
	    id: 25385,
	    name: 'Inesval',
	    initials: 'ine',
	    username: 'inesval',
	    email: 'inesval@worker.minbar.minbari'
	  },
	  {
	    membership_id: 2551933,
	    role: 'member',
	    last_viewed_at: 0,
	    id: 126765,
	    name: 'Pairmatic Role User',
	    initials: 'pairmatic',
	    username: 'pairmatic42',
	    email: 'jenimer+pairmatic@grey.minbar.minbari'
	  }
        ]
    ));
  };
})();

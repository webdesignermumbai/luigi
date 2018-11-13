var navigationPermissionChecker = function (nodeToCheckPermissionFor, parentNode, currentContext) {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  var mockCurrentUserGroups = ['admins'];
  if (nodeToCheckPermissionFor.constraints) {
    // check if user has required groups
    return nodeToCheckPermissionFor.constraints.filter(
      function (c) {
        return mockCurrentUserGroups.indexOf(c) !== -1;
      }
    ).length !== 0;
  }

  return true;
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var getAllProjects = function () {
  return new Promise(function (resolve) {
    resolve([{
        id: 'pr1',
        name: 'Project One'
      },
      {
        id: 'pr2',
        name: 'Project Two'
      }
    ]);
  });
};

var getProjectPlugins = function (projectId) {
  return new Promise(function (resolve) {
    if (projectId === 'pr2') {
      resolve([{
          category: 'ExternalViews',
          viewId: 'viewX',
          label: 'This is X',
          viewUrl: 'https://this.is.x/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'viewY',
          label: 'This is Y',
          viewUrl: 'https://this.is.y/index.html'
        }
      ]);
    } else {
      resolve([{
          category: 'ExternalViews',
          viewId: 'abc',
          label: 'A B C',
          viewUrl: 'https://a.b.c/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'def',
          label: 'D E F',
          viewUrl: 'https://d.e.f/index.html',
          context: {
            aaaaa: 'hiiiiii'
          }
        }
      ]);
    }
  });
};

var projectDetailNavProviderFn = function (context) {
  return new Promise(function (resolve) {
    var projectId = context.currentProject;
    var children = [{
        category: 'Usermanagement',
        pathSegment: 'users',
        label: 'Users and Groups',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/users',
        children: [{
            category: 'Groups',
            pathSegment: 'groups',
            label: 'Groups',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/users/groups',
            children: [{
              pathSegment: ':group',
              viewUrl: '/sampleapp.html#/projects/' +
                projectId +
                '/users/groups/:group',
              context: {
                currentGroup: ':group'
              },
              children: [{
                label: 'Group Settings',
                pathSegment: 'settings',
                viewUrl: '/sampleapp.html#/projects/' +
                  projectId +
                  '/users/groups/:group/settings'
              }]
            }]
          },
          {
            pathSegment: 'usersoverview',
            label: 'Users Overview',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/users/usersoverview'
          }
        ]
      },
      {
        category: 'Usermanagement',
        pathSegment: 'developers',
        label: 'Developers',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/developers'
      },
      {
        category: 'Settings',
        pathSegment: 'settings',
        label: 'Project Settings',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings'
      },
      {
        pathSegment: 'miscellaneous',
        constraints: ['unicorns'],
        label: 'Miscellaneous',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous'
      },
      {
        pathSegment: 'miscellaneous2',
        label: 'Miscellaneous2',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2'
      },
      {
        pathSegment: 'misc2-isolated',
        label: 'Miscellaneous2 (Isolated View)',
        isolateView: true,
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2'
      },
      {
        pathSegment: 'dps',
        label: 'Default Child Node Example',
        defaultChildNode: 'dps2',
        children: [{
            pathSegment: 'dps1',
            label: 'First Child',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps1'
          },
          {
            pathSegment: 'dps2',
            label: 'Second Child',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps2'
          }
        ]
      },
      {
        pathSegment: 'avengers',
        label: 'Keep Selected Example',
        viewUrl: '/sampleapp.html#/projects/' +
          projectId +
          '/dynamic/avengers',
        keepSelectedForChildren: true,
        context: {
          label: 'Avengers',
          links: ['Captain America', 'Iron Man', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye', 'Loki']
        },
        children: ['Captain America', 'Iron Man', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye', 'Loki'].map(name => ({
          pathSegment: name.toLowerCase().split(' ').join('-'),
          label: name,
          context: {
            label: name,
            links: ['Super Power']
          },
          viewUrl: '/sampleapp.html#/projects/' +
            projectId +
            '/dynamic/' + name.toLowerCase().split(' ').join('-'),
          children: [{
            label: 'Super Power',
            pathSegment: 'super-power',
            context: {
              label: 'Super Power',
              links: ['Details']
            },
            viewUrl: '/sampleapp.html#/projects/' +
              projectId +
              '/dynamic/super-power',
            children: [{
              label: 'Details',
              pathSegment: 'details',
              context: {
                label: 'Details',
                links: false
              },
              viewUrl: '/sampleapp.html#/projects/' +
                projectId +
                '/dynamic/details'
            }]
          }]
        }))
      }
    ];
    getProjectPlugins(projectId).then(function (result) {
      result.forEach(function (plugin) {
        children.push({
          category: plugin.category,
          pathSegment: plugin.viewId,
          label: plugin.label,
          viewUrl: plugin.viewUrl,
          context: plugin.context
        });
      });
      resolve(children);
    });
  });
};

var projectsNavProviderFn = function (context) {
  return new Promise(function (resolve) {
    getAllProjects().then(function (result) {
      var children = [];
      result.forEach(function (project) {
        children.push({
          /**
           * navigationContext:
           * Use it for dynamic nodes in order to navigate
           * within a specific context (project in this case)
           * Besides navigate and navigateRelative,
           * LuigiClient provides fromClosestContext().navigate(path)
           * and fromContext(navigationContext).navigate(path) functions
           * which can be used to go upwards multiple context levels
           * eg. /home/:environment/projects/:project/ to go to /home/:environment/settings
           */
          navigationContext: 'project',
          pathSegment: project.id,
          label: project.name,
          viewUrl: '/sampleapp.html#/projects/' + project.id,
          context: {
            currentProject: project.id
          },
          children: projectDetailNavProviderFn
        });
      });
      resolve(children);
    });
  });
};

Luigi.setConfig({
  auth: {
    use: 'mockAuth',
    mockAuth: {
      authorizeUrl: `${window.location.origin}/assets/auth-mock/login-mock.html`,
      logoutUrl: `${window.location.origin}/assets/auth-mock/logout-mock.html`,
      post_logout_redirect_uri: '/logout.html',
      authorizeMethod: 'GET',
      oAuthData: {
        client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
      }
    },
    events: {
      onLogout: function () {
        console.log('onLogout');
      },
      onAuthSuccessful: function (data) {
        console.log('onAuthSuccessful', data);
      },
      onAuthExpired: function () {
        console.log('onAuthExpired');
      },
      // TODO: define luigi-client api for getting errors
      onAuthError: function (err) {
        console.log('authErrorHandler 1', err);
      }
    }
  },
  navigation: {
    nodeAccessibilityResolver: navigationPermissionChecker,
    nodes: function () {
      return [
        {
          pathSegment: 'dashbaord',
          label: 'Dashbaord',
          children: [{
              category: 'Overview',
              pathSegment: 'coupons',
              label: 'Coupons',
              viewUrl: '/assets/sampleexternal.html#coupons'
            },
            {
              category: 'Overview',
              pathSegment: 'external-app',
              label: 'External App',
              viewUrl: 'https://ssvnodemean.herokuapp.com/'
            },
            {
              category: 'Overview',
              pathSegment: 'velocity',
              label: 'Velocity Templates',
              viewUrl: '/assets/sampleexternal.html#velocity'
            },
            {
              category: 'Overview',
              pathSegment: 'document',
              label: 'Document Explorer',
              viewUrl: '/assets/sampleexternal.html#document'
            },
            {
              category: 'Overview',
              pathSegment: 'email',
              label: 'Email Templates',
              viewUrl: '/assets/sampleexternal.html#email'
            },
            {
              category: 'Overview',
              pathSegment: 'brands',
              label: 'Brands',
              viewUrl: 'http://todomvc.com/examples/angularjs/#/'
            },
            {
              category: 'Overview',
              pathSegment: 'commerce',
              label: 'Commerce Settings',
              viewUrl: 'http://ssvnodemean.herokuapp.com/'
            },
            {
              category: 'Overview',
              pathSegment: 'content',
              label: 'Content',
              viewUrl: '/assets/sampleexternal.html#content'
            },
            {
              category: 'Overview',
              pathSegment: 'countries',
              label: 'Countries',
              constraints: ['unicorns'],
              viewUrl: '/assets/sampleexternal.html#countries'
            },
            {
              category: 'Overview',
              pathSegment: 'reports',
              label: 'Coupon Reports',
              viewUrl: 'https://test-coupon-admin.scapp.io/'
            },
            {
              category: 'Development',
              pathSegment: 'development',
              label: 'Development',
              viewUrl: '/assets/sampleexternal.html#development'
            },
            {
              category: 'Administration',
              pathSegment: 'administration',
              label: 'Administration',
              viewUrl: '/assets/sampleexternal.html#administration'
            },
          ]
        }
        //,
        // {
        //   pathSegment: 'projects',
        //   label: 'Projects1',
        //   viewUrl: '/sampleapp.html#/projects/overview',
        //   children: projectsNavProviderFn
        // },
        // {
        //   pathSegment: 'settings',
        //   label: 'Settings',
        //   viewUrl: '/sampleapp.html#/settings'
        // },
        ,{
          pathSegment: 'styleguide',
          label: 'Styleguide',
          viewUrl: '/sampleapp.html#/styleguide'
        }
        // ,{
        //   pathSegment: 'cuponadmin',
        //   label: 'Cupon Admin',
        //   viewUrl: '/sampleapp.html#/cuponadmin'
        // }
      ]
    }
  },
  routing: {
    useHashRouting: true
  }
});

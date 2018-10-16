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
    nodes: () => [
      {
        pathSegment: 'dashbaord',
        label: 'Dashbaord',
        children: [
          {
            category: 'Overview',
            pathSegment: 'coupons',
            label: 'Coupons',
            viewUrl: '/assets/sampleexternal.html#coupons'
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
            viewUrl: '/assets/sampleexternal.html#brands'
          },
          {
            category: 'Overview',
            pathSegment: 'commerce',
            label: 'Commerce Settings',
            viewUrl: '/assets/sampleexternal.html#commerce'
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
            viewUrl: '/assets/sampleexternal.html#countries'
          },
          {
            category: 'Overview',
            pathSegment: 'reports',
            label: 'Coupon Reports',
            viewUrl: '/assets/sampleexternal.html#reports'
          }
        ]
      }
    ]
  },
  routing: {
    useHashRouting: true
  }
});
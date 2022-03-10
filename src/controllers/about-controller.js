export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About WineMark",
        };
        return h.view("about-view", viewData);
      },
    },
  };
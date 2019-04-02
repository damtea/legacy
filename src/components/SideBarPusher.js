import React from "react";
class SideBarPusher extends React.Component {
  render() {
    return (
      <Sidebar.Pusher dimmed={visible}>
        <Segment basic>
          <Header as="h3">Application Content</Header>
          <Image src="/images/wireframe/paragraph.png" />
        </Segment>
      </Sidebar.Pusher>
    );
  }
}

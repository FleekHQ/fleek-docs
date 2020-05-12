import React from "react";
import Facebook from '@fortawesome/fontawesome-free/svgs/brands/facebook.svg';
import Youtube from '@fortawesome/fontawesome-free/svgs/brands/youtube.svg';
import Twitter from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';
import Discourse from '@fortawesome/fontawesome-free/svgs/brands/discourse.svg';
import Github from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import Slack from '@fortawesome/fontawesome-free/svgs/brands/slack.svg';
import Fleek from '../images/FleekIconForLight.svg';
import Tree from "./tree";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import "../styles.css";
import config from "../../../config";

const forcedNavOrder = config.sidebar.forcedNavOrder;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} target="_blank" rel="noopener noreferrer" {...props} />
    </li>
  );
})`
  list-style: none;
  display: inline-block;
  a {
    width: 50px;
    height: 50px;
    padding: 0 !important;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

const Sidebar = styled("aside")`
  width: 100%;
  /* background-color: rgb(255, 255, 255); */
  /* border-right: 1px solid #ede7f3; */
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #2d2d2d;
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(#2d2d2d, #0f0f0f);
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#2d2d2d),
    to(#0f0f0f)
  );
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(top, #2d2d2d, , #0f0f0f);
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(top, #2d2d2d, , #0f0f0f);
  /* IE 10 */
  background: -ms-linear-gradient(top, #2d2d2d, , #0f0f0f);
  /* Opera 11.10+ */
  background: -o-linear-gradient(top, ##2d2d2d, , #0f0f0f);

  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #2d2d2d;
    background: #372476;
    height: auto;
  }
`;

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {

      const Icon = styled(props => {
        const { icon, className } = props;

        const iconMapping = {
          twitter: Twitter,
          facebook: Facebook,
          discourse: Discourse,
          slack: Slack,
          youtube: Youtube,
          fleek: Fleek,
          github: Github,
          default: Fleek,
        };

        const DisplayedIcon = iconMapping[icon] || iconMapping["default"]

        return (
          <div className={className}>
            <DisplayedIcon />
          </div>
        )

        return (
          <img src={displayedIcon} className={className} />
        );
      })`
        display: inline-block;
        fill: white;
        svg {
          height: 30px;
          width: auto;
          path {
            fill: white;
            :hover {
              fill: #542683;
            }
          }
        }
      `;


      return (
        <Sidebar>
          <ul className={"sideBarUL"}>
            <Tree edges={allMdx.edges} />
            <Divider />
            {config.sidebar.links.map((link, key) => {
              console.log(link);
              if (link.link !== "" && (link.text !== "" || link.icon !== "")) {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <Icon icon={link.icon} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </Sidebar>
      );
    }}
  />
);

export default SidebarLayout;

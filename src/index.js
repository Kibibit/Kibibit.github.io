/* eslint-disable no-unused-vars */
import { webConsolelogo } from '@kibibit/consologo';
import treeData from './tree.data';

console.log(treeData);

webConsolelogo('kibibit.io Homepage');

const body = document.body;
const html = document.documentElement;

// nice

const svg = d3.select('body')
  .append('div')
  // Container class to make it responsive.
  .classed('svg-container', true)
  .append('svg');

redraw();

$('.kb-close').click(function() {
  $(this).closest('.kb-crt').removeClass('active');
});

window.addEventListener('resize', debounce(onResize, 800));

function onResize() {
  svg.selectAll('*').remove();
  redraw();
}

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

function redraw() {
  const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

  const width = Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth);

  svg
    .attr('width', width)
    .attr('height', height);

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody().strength(-5000))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const links = svg.selectAll('foo')
    .data(treeData.edges)
    .enter()
    .append('line')
    .style('stroke', '#ccc')
    .style('stroke-width', 2);

  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const node = svg.selectAll('foo')
    .data(treeData.nodes)
    .enter()
    .append('g')
    .classed('graph-node', true)
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  const nodeCircle = node.append('circle')
    .attr('r', 50)
    .attr('stroke', 'gray')
    .attr('stroke-width', '3px')
    .attr('fill', '#212121');

  const nodeImage = node.append('image')
    .attr('xlink:href', (d) => d.image)
    .attr('height', '80')
    .attr('width', '80')
    .attr('x', -40)
    .attr('y', -40)
    .on('click', function(datum) {
      // Determine if current line is visible
      if (datum.modalSelector === '#about-readme') {
        const octokit = new Octokit();

        Promise.all([
          octokit.repos.getContents({
            owner: 'kibibit',
            repo: datum.id,
            path: 'README.md'
          }),
          octokit.repos.getContents({
            owner: 'kibibit',
            repo: datum.id,
            path: 'package.json'
          })
        ])
          .then((result) => {
            let [ readme, info ] = result;

            try {
              info = JSON.parse(atob(info.data.content));
            } catch (err) {}

            let content = '';
            atob(readme.data.content)
              .replace(/^([\s\S]*\<hr\>)([\s\S]*?)(#+\s?Contributing[\s\S]*)?$/m, (full, first, second, third) => {
                content = `${ first }\n${ third || '' }`;
                return `${ first }\n${ third || '' }`;
              });

            content = content
              .replace('"logo.png"', `"//kibibit.io/${datum.id}/logo.png"`)
              .replace('"logo-clear.png"', `"//kibibit.io/${datum.id}/logo-clear.png"`);

            showdown.setFlavor('github');

            const converter = new showdown.Converter({
              emoji: true,
              tables: true
            });
            converter.setOption('emoji', true);
            const newHtml = converter.makeHtml(content);

            const modalElement = $(datum.modalSelector);
            const modalContentElement = modalElement.find('.content');
            const githubLinkElement = modalElement.find('.watch-on-github');
            const homepageLinkElement = modalElement.find('.watch-homepage');

            modalContentElement.html(newHtml);
            githubLinkElement.attr('href', `https://github.com/kibibit/${ datum.id }`);
            homepageLinkElement.attr('href', info.homepage || '');
            if (!info.homepage) {
              homepageLinkElement.hide();
            } else {
              homepageLinkElement.show();
            }
            modalElement.addClass('active');
          })
          .catch((err) => console.error(err));
      } else {
        $(datum.modalSelector).addClass('active');
      }
    });

  // var texts = node.append("text")
  //     .style("fill", "white")
  //     .attr("dx", 30)
  //     .attr("dy", 8)
  //     .text(function(d) {
  //         return d.id;
  //     });

  simulation.nodes(treeData.nodes);
  simulation.force('link')
    .links(treeData.edges);

  simulation.on('tick', function() {
    links.attr('x1', function(d) {
      return d.source.x;
    })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    node.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
  });

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

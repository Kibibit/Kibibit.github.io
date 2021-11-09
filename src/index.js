import { webConsolelogo } from '@kibibit/consologo';

webConsolelogo('kibibit.io Homepage');

var body = document.body,
  html = document.documentElement;
  
  // nice

var svg = d3.select("body")
  .append("svg");

redraw();

$('.kb-close').click(function () {
  $(this).closest('.kb-crt').removeClass('active');
});

// window.addEventListener("resize", reredraw);

function redraw() {
  var height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

  var width = Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth);

  svg
    .attr("width", width)
    .attr("height", height);

  var nodes = [{
      "id": "kibibit",
      "image": "https://kibibit.io/logo-demo/logo.png",
      "modalSelector": "#about-kibibit"
    },
    {
      "id": "achievibit",
      "image": "https://github.com/Kibibit/kibibit-assets/raw/master/logo-achi.png",
      "modalSelector": "#about-readme"
    },
    // {
    //   "id": "achievibit-chrome-extension",
    //   "image": "https://www.pivotaltracker.com/marketing_assets/integrations/2015/google-chrome-extension-6a26cdad27e6f383174791f8648fbe4cc7627acc06e3870c588217c98d1bde91.png",
    //   "modalSelector": "#about-readme"
    // },
    {
      "id": "kibibit-code-editor",
      "image": "https://kibibit.io/logo-demo/code-editor.png",
      "modalSelector": "#about-readme"
    },
    {
      "id": "cli-lit",
      "image": "https://kibibit.io/kibibit-assets/cli-lit-logo-transparent.png",
      "modalSelector": "#about-readme"
    },
    {
      "id": "kb-components",
      "image": "https://kibibit.io/kibibit-assets/kb-components-logo-transparent.png",
      "modalSelector": "#about-readme"
    },
    {
      "id": "tdd1t",
      "image": "https://kibibit.io/kibibit-assets/4x/tdd1t-avatar-transparent%404x.png",
      "modalSelector": "#about-readme"
    },
    {
      "id": "kb-hologram",
      "image": "https://kibibit.io/kibibit-assets/kb-hologram/logo.svg",
      "modalSelector": "#about-readme"
    },
    {
      "id": "announce-it",
      "image": "https://camo.githubusercontent.com/b80d088e5a18d62cee79035f457e157792b4d99f/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f616e6e6f756e63652d69742e737667",
      "modalSelector": "#about-readme"
    },
    {
      "id": "cold-deck",
      "image": "https://kibibit.io/kibibit-assets/cold-deck/logo.svg",
      "modalSelector": "#about-readme"
    },
    {
        "id": "stacker",
        "image": "https://kibibit.io/kibibit-assets/stacker.png",
        "modalSelector": "#about-readme"
      },
      {
        "id": "hass-kibibit-theme",
        "image": "https://kibibit.io/kibibit-assets/hassio-theme/hassio-theme-logo-trans.png",
        "modalSelector": "#about-readme"
      },
      {
        "id": "command-lime",
        "image": "https://kibibit.io/command-lime/logo-clear.png",
        "modalSelector": "#about-readme"
      },
      {
        "id": "dev-tools",
        "image": "https://kibibit.io/dev-tools/logo.png",
        "modalSelector": "#about-readme"
      },
      {
        "id": "configit",
        "image": "https://kibibit.io/configit/logo.png",
        "modalSelector": "#about-readme"
      },
    // {
    //   "id": "kb-login-page",
    //   "image": "https://camo.githubusercontent.com/01a1947671f7f77ecdd0096aa8d8f51b6aadaa4a/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f6c6f67696e2e737667",
    //   "modalSelector": "#about-readme"
    // },
    // {
    //   "id": "kb-profile-page",
    //   "image": "https://camo.githubusercontent.com/7620455813fc7ce4ed7f9017f188f301e371d2fb/687474703a2f2f6b6962696269742e696f2f6b6962696269742d6173736574732f70726f66696c652e737667",
    //   "modalSelector": "#about-readme"
    // }
  ];

  var edges = [{
      "source": 0,
      "target": 1
    },
    {
      "source": 0,
      "target": 2
    },
    {
      "source": 0, // can be 1 if we want to attach the extension to achievibit instead
      "target": 3
    },
    {
      "source": 0,
      "target": 4
    },
    {
      "source": 0,
      "target": 5
    },
    {
      "source": 0,
      "target": 6
    },
    {
      "source": 0,
      "target": 7
    },
    {
      "source": 0,
      "target": 8
    },
    {
      "source": 0,
      "target": 9
    },
    {
        "source": 0,
        "target": 10
      },
      {
        "source": 0,
        "target": 11
      },
      {
        "source": 0,
        "target": 12
      },
      {
        "source": 0,
        "target": 13
      }
  ];

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody().strength(-5000))
    .force("center", d3.forceCenter(width / 2, height / 2));

  var links = svg.selectAll("foo")
    .data(edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 2);

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var node = svg.selectAll("foo")
    .data(nodes)
    .enter()
    .append("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  var nodeCircle = node.append("circle")
    .attr("r", 50)
    .attr("stroke", "gray")
    .attr("stroke-width", "3px")
    .attr("fill", "#212121");

  var nodeImage = node.append("image")
    .attr("xlink:href", d => d.image)
    .attr("height", "80")
    .attr("width", "80")
    .attr("x", -40)
    .attr("y", -40)
    .on("click", function (datum) {
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
          .then(result => {
            let [readme, info] = result;

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
              .replace('"logo-clear.png"', `"//kibibit.io/${datum.id}/logo-clear.png"`)

            showdown.setFlavor('github');

            const converter = new showdown.Converter({
              emoji: true,
              tables: true
            });
            converter.setOption('emoji', true);
            const html = converter.makeHtml(content);

            const modalElement = $(datum.modalSelector);
            const modalContentElement = modalElement.find('.content');
            const githubLinkElement = modalElement.find('.watch-on-github');
            const homepageLinkElement = modalElement.find('.watch-homepage');

            modalContentElement.html(html);
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

  simulation.nodes(nodes);
  simulation.force("link")
    .links(edges);

  simulation.on("tick", function () {
    links.attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })

    node.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")


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

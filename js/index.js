var body = document.body,
    html = document.documentElement;

var svg = d3.select("body")
.append("svg");

redraw();

$('.kb-close').click(function() {
  $(this).closest('.kb-crt').removeClass('active');
});

// window.addEventListener("resize", reredraw);

function redraw() {
  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );

  var width = Math.max( body.scrollWidth, body.offsetWidth, 
                       html.clientWidth, html.scrollWidth, html.offsetWidth );

  svg
    .attr("width", width)
    .attr("height", height);

  var nodes = [{
    "id": "kibibit",
    "image": "http://kibibit.io/logo-demo/logo.png",
    "modalSelector": "#about-kibibit"
  }, {
    "id": "achievibit",
    "image": "https://github.com/Kibibit/kibibit-assets/raw/master/logo-achi.png",
    "modalSelector": "#about-readme"
  }, {
    "id": "kibibit-code-editor",
    "image": "http://kibibit.io/logo-demo/code-editor.png",
    "modalSelector": "#about-readme"
  }, {
    "id": "achievibit-chrome-extension",
    "image": "https://www.pivotaltracker.com/marketing_assets/integrations/2015/google-chrome-extension-6a26cdad27e6f383174791f8648fbe4cc7627acc06e3870c588217c98d1bde91.png",
    "modalSelector": "#about-readme"
  },
               {
                 "id": "cli-lit",
                 "image": "http://kibibit.io/kibibit-assets/cli-lit-logo-transparent.png",
                 "modalSelector": "#about-readme"
               },
               {
                 "id": "kb-components",
                 "image": "http://kibibit.io/kibibit-assets/kb-components-logo-transparent.png",
                 "modalSelector": "#about-readme"
               },
              {
                 "id": "tdd1t",
                 "image": "http://kibibit.io/kibibit-assets/4x/tdd1t-avatar-transparent%404x.png",
                 "modalSelector": "#about-readme"
               }];

  var edges = [{
    "source": 0,
    "target": 1
  }, {
    "source": 0,
    "target": 2
  }, {
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
               }];

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
  .on("click", function(datum){
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
        let [ readme, info ] = result;

        try {
          info = JSON.parse(atob(info.data.content));
        } catch(err) {}

        let content = '';
        atob(readme.data.content)
          .replace(/^([\s\S]*\<hr\>)([\s\S]*?)(#+\s?Contributing[\s\S]*)?$/m, (full, first, second, third) => {
          content = `${ first }\n${ third || '' }`;
          return `${ first }\n${ third || '' }`;
        });

        showdown.setFlavor('github');

        const converter = new showdown.Converter({ emoji: true, tables: true });
        converter.setOption('emoji', true);
        const html = converter.makeHtml(content);

        $(`${ datum.modalSelector } .content`).html(html);
        $(`${ datum.modalSelector } .watch-on-github`).attr('href', `https://github.com/kibibit/${ datum.id }`);
        $(`${ datum.modalSelector } .watch-homepage`).attr('href', info.homepage || '');
        if (!info.homepage) { $(`${ datum.modalSelector } .watch-homepage`).hide(); }
        $(datum.modalSelector).addClass('active');
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

  simulation.on("tick", function() { 
    links.attr("x1", function(d) {
      return d.source.x;
    })
      .attr("y1", function(d) {
      return d.source.y;
    })
      .attr("x2", function(d) {
      return d.target.x;
    })
      .attr("y2", function(d) {
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

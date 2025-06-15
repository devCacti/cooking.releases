function getReleases() {
    fetch("https://api.github.com/repos/devCacti/Cooking/releases")
        .then(response => response.json())
        .then(releases => {
            const latestReleaseDiv = document.getElementById("latest-release");
            const list = document.getElementById("apk-list");

            let latestSet = false;

            releases.forEach(release => {
                const { name, body, published_at, assets } = release;

                assets.forEach(asset => {
                    if (asset.name.endsWith(".apk")) {
                        const a = document.createElement("a");
                        a.href = asset.browser_download_url;
                        a.textContent = asset.name;
                        a.download = "";
                        a.classList = "button";

                        if (!latestSet) {
                            // Convert markdown body to HTML
                            const descriptionHTML = body ? marked.parse(body) : "";

                            latestReleaseDiv.innerHTML = `
                                <h1>${name || "Latest Release"}</h1>
                                <p><strong>Published:</strong> ${new Date(published_at).toLocaleDateString()}</p>
                                <br>
                            `;

                            const p = document.createElement("p");
                            p.appendChild(a);
                            latestReleaseDiv.appendChild(p);
                            latestSet = true;
                        } else {
                            const li = document.createElement("li");
                            li.appendChild(a);
                            list.appendChild(li);
                        }
                    }
                });
            });
        });
}

getReleases();

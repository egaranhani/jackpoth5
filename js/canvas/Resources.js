

function Resources(){
	
	var loadedResources = new Object();
	
	this.load = function(imageResourcesURLs, percentageListener){
		var resourcesLoaded = 0;
		var resourceCount = imageResourcesURLs.length;
		 
		for(var i in imageResourcesURLs){
			(function(){
				var image = new Image();
				var imageUrl = imageResourcesURLs[i].url;
				var imageName = imageResourcesURLs[i].name;
				
				image.onload = function(){
					var m_canvas = document.createElement('canvas');
					m_canvas.width = ballWidth;
					m_canvas.height = ballHeight;
					var m_context = m_canvas.getContext('2d');
					m_context.drawImage(image, 0, 0);
					loadedResources[imageName] = m_canvas;
					
					//Colorize---------------------
					var originalPixels = m_context.getImageData(0, 0, m_canvas.width, m_canvas.height);
    				var currentPixels = m_context.getImageData(0, 0, m_canvas.width, m_canvas.height);
					
					var newColor = {R:Math.random()*255,G:Math.random()*255,B:Math.random()*255};

					for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
					{
						if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
						{
							currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
							currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
							currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
						}
					}
			
					m_context.putImageData(currentPixels, 0, 0);
					//-----------------------------
										
					resourcesLoaded++;
					var newPercetage = (resourcesLoaded/resourceCount)*100;
					percentageListener.updateLoadedPercentage(newPercetage);
					if(resourcesLoaded == resourceCount)
						percentageListener.loadingComplete();
				};
				image.src = imageUrl;
			})();
		}
	};
	
	this.get = function(resourceName){
		if(loadedResources[resourceName] == null)
			throw "No such resource "+resourceName;
		return loadedResources[resourceName];
	};
}

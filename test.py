def shapes(f, v):
	shapes_list=[]
	used_v= set([])
	for z in range(0, len(f)):
		faces =[]
		if used_v.isdisjoint(f[z]) == False:
			continue
		else:
			shape_set=set(f[z])
		for x in range(z, len(f)):
			for i in range(z, len(f)):
				for a in range(z, len(f)):
					if shape_set.isdisjoint(f[a]) == False:
						shape_set.update(f[a])
						used_v.update(shape_set)
			if shape_set.isdisjoint(f[x]) == False:
				faces.append(f[x])
		shapes_list.append(faces)
	return shapes_list
f=[[1,2,3],[1,3,4],[6,7,9],[7,8,9],[9,8,10],[5,9,6,10]]
v=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(shapes(f,v))
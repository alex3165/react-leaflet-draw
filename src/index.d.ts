import * as React from 'react';
import type {
	DrawOptions,
	EditOptions,
	ControlPosition,
	DrawEvents,
} from 'leaflet';

interface EditControlProps {
	onEdited?: (v: DrawEvents.Edited) => void;
	onDrawStart?: (v: DrawEvents.DrawStart) => void;
	onDrawStop?: (v: DrawEvents.DrawStop) => void;
	onDrawVertex?: (v: DrawEvents.DrawVertex) => void;
	onEditStart?: (v: DrawEvents.EditStart) => void;
	onEditMove?: (v: DrawEvents.EditMove) => void;
	onEditResize?: (v: DrawEvents.EditResize) => void;
	onEditVertex?: (v: DrawEvents.EditVertex) => void;
	onEditStop?: (v: DrawEvents.EditStop) => void;
	onDeleted?: (v: DrawEvents.Deleted) => void;
	onDeleteStart?: (v: DrawEvents.DeleteStart) => void;
	onDeleteStop?: (v: DrawEvents.DeleteStop) => void;

	onCreated?: (v: DrawEvents.Created) => void;
	onMounted?: Function;
	edit?: EditOptions;
	draw: {
		polyline?: DrawOptions.PolylineOptions | boolean;
		polygon?: DrawOptions.PolygonOptions | boolean;
		rectangle?: DrawOptions.RectangleOptions | boolean;
		circle?: DrawOptions.CircleOptions | boolean;
		marker?: DrawOptions.MarkerOptions | boolean;
		circlemarker?: DrawOptions.CircleOptions | boolean;
	};

	position: ControlPosition;
}

export class EditControl extends React.Component<EditControlProps> {}
